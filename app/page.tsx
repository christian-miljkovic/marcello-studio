import styles from './page.module.css';

const clients = [
  { name: 'HAITCH', href: 'https://haitch-usa.com' },
  { name: 'NON GRATA', href: 'https://www.magazinenongrata.com/' },
];

export default function Home() {
  return (
    <main className={styles.page}>
      <div className={styles.column}>
        <h1 className={styles.wordmark}>Marcello Studio</h1>

        <p className={styles.intro}>
          A creative technology and design studio for fashion brands, labels,
          and the studios around them. High touch, from the first conversation
          to the final creation.
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
                </a>
              </li>
            ))}
          </ul>
        </section>

        <p className={styles.contact}>
          <a href="mailto:contact@marcello.studio">contact@marcello.studio</a>
          <span aria-hidden="true"> · </span>New York
        </p>
      </div>
    </main>
  );
}
