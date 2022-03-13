import { query as q } from "faunadb";
import { fauna } from "../../../services/fauna";
import { stripe } from "../../../services/stripe";

export async function saveSubscription(
  subscriptionId: string,
  costumerId: string,
  createAction = false
) {
  //`1. Buscar o usuario no faunadb com o id {costumerId}

  const userRef = await fauna.query(
    q.Select(
      "ref",
      q.Get(q.Match(q.Index("user_by_stripe_costumer_id"), costumerId))
    )
  );

  const subscription = await stripe.subscriptions.retrieve(subscriptionId);

  // 2. Salvar os  dados da subscription no faunadb
  const subscriptionData = {
    id: subscription.id,
    userId: userRef,
    status: subscription.status,
    price_id: subscription.items.data[0].price.id,
  };

  console.log(subscriptionData);

  if (createAction) {
    await fauna.query(
      q.Create(q.Collection("subscriptions"), { data: { subscriptionData } })
    );
  } else {
    await fauna.query(
      q.Update(
        q.Select(
          "ref",
          q.Get(q.Match(q.Index("subscription_by_id"), subscriptionId))
        ),
        {
          data: {
            status: subscriptionData.status,
          },
        }
      )
    );
  }
}
