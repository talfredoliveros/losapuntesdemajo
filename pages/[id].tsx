import type {NextPage} from 'next'
import Head from 'next/head'
import Image from 'next/image';

import data from "../data.json";

import styles from '../styles/Home.module.css'
import { Note } from  '../types';

interface Props {
  note : Note;
}

const Home: NextPage<Props> = ({note} ) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Los apuntes de Majo | {note.title} </title>
        <meta name="description" content={note.description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
         <h1 className={styles.title}>
            Apuntes de {note.title}
         </h1>

         <p className={styles.description}>
            {note.description}
         </p>
         <iframe width="640" height="480" allow="autoplay"
                 src={`${note.file}/preview`}>
         </iframe>
         <a className={styles.card} 
              href={`${note.file}/view`}>
              <h2>Descargar &rarr;</h2>
         </a>

      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
};


export const getStaticProps: GetStaticProps<any,any> = async ({params: {id}}) => {
  console.log({id});
  const note = data.find( (note) => note.id === id);
  return {
    props: {
      note,
    },
    revalidate:10,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  
   return {
     paths: data.map( (note) => ({params: {id: note.id }}) ),
     fallback: false,
     
   };
 };
 
export default Home;