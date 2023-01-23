import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import styled from '@emotion/styled'
import Navbar from '@/components/Navbar'

const DisplayContainer = styled.div`

`

export default function Home() {
    return (
        <>
            <Head>
                <title>Sqlweb</title>
                <meta name="description" content="Oracle Sql web" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
				
            </Head>
            <main className={styles.mainContainer}>

				<Navbar />
				<DisplayContainer>
					{/* Main container to display SQL */}
				</DisplayContainer>

			</main>
        </>
    )
}
