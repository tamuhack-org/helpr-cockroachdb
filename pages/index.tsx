import Head from 'next/head';
import { GetServerSideProps } from 'next';

import useSWR from 'swr';
import { fetcher } from '../lib/common';

import Banner from '../components/common/Banner';
import Navbar from '../components/common/Navbar';
import Submit from '../components/home/Submit';

import { Session, unstable_getServerSession } from 'next-auth';
import authOptions from './api/auth/[...nextauth]';
import { Nullable } from '../lib/common';
import Loading from '../components/common/Loading';

export default function Home() {
  const { data, error, isLoading } = useSWR('/api/users/me', fetcher, {
    refreshInterval: 5000,
  });

  if (isLoading || error) {
    return <Loading />;
  }

  return (
    <>
      <Head>
        <title>HelpR</title>
        <meta
          name="description"
          content="Online Mentorship Queue For Hackathon Participants"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="h-full py-10">
        <Banner />
        <div className="flex justify-center items-center mt-8 md:mt-24">
          <div className="flex flex-col gap-4 mx-4 md:w-[500px]">
            <Navbar user={data.user} page="home" />
            <Submit user={data.user} ticket={data.user.ticket} />
          </div>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session: Nullable<Session> = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
