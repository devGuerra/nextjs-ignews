import Head from "next/head";
import Image from "next/image";

import styles from "./home.module.scss";

export default function Home() {
  return (
    <>
      <Head>
        <title>Home | ig.news</title>
      </Head>

      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏 Hey, welcome</span>
          <h1>
            News about the <span>React</span> world.
          </h1>
          <p>
            Get acess to all publications
            <br />
          </p>
          <span>for $9.90 month </span>
        </section>

        <Image
          src="/images/avatar.svg"
          alt="girl codding"
          width="521"
          height="336px"
        />
      </main>
    </>
  );
}
