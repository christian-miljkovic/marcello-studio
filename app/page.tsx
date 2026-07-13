import styles from './page.module.css';

const clients = [
  { name: 'HAITCH', href: 'https://haitch-usa.com' },
  { name: 'NON GRATA', href: 'https://www.magazinenongrata.com/' },
];

export default function Home() {
  return (
    <main className={styles.page}>
      <div className={styles.column}>
        <h1 className={styles.wordmark}>Marcello</h1>

        <p className={styles.intro}>
          Websites and applications for fashion brands, labels, and the studios
          around them. High touch, from the first conversation to long after
          launch.
        </p>

        <section aria-labelledby="clients-heading">
          <h2 id="clients-heading" className={styles.label}>
            Selected Clients
          </h2>
          <ul className={styles.clients}>
            {clients.map((client) => (
              <li key={client.name}>
                <a href={client.href} target="_blank" rel="noopener noreferrer">
                  {client.name}
                  <span className={styles.arrow} aria-hidden="true">
                    ↗
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </section>

        <p className={styles.contact}>
          <a href="mailto:studio@marcello.studio">studio@marcello.studio</a>
          <span aria-hidden="true"> · </span>New York
        </p>
      </div>
    </main>
  );
}
