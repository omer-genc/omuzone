import { GetServerSideProps } from 'next';
import React from 'react';
import api, { IRes } from '../bloc/api';
import Layout from '../components/Layout';

type Props = {
  data: IRes;
};
const AboutUs: React.FC<Props> = ({ data }) => {
  return (
    <div>
      <Layout
        products={data.urunler}
        isOneColor={true}
        categories={data.kategoriler}
      >
        <section className="w-full p-20 bg-black text-white space-y-16 mt-20">
          <div className="flex flex-col md:flex-row gap-16">
            <picture className="w-full md:w-1/2">
              <img
                src="https://images.unsplash.com/photo-1671705449511-06c390d6417f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=965&q=80"
                alt=""
              />
            </picture>

            <div className="w-full space-y-2 flex flex-col justify-center">
              <h1 className="text-5xl">Hakkımızda</h1>
              <h5>
                Lorem. <span className="span"> & Lorem, ipsum.</span>
              </h5>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Asperiores consectetur, assumenda inventore nihil sunt
                doloremque ullam consequuntur dignissimos nisi mollitia?
              </p>
            </div>
          </div>

          <div className="flex flex-col-reverse md:flex-row gap-16">
            <div className="w-full space-y-2 flex flex-col justify-center">
              <h1 className="text-5xl">Biz Kimiz</h1>
              <h5>
                Lorem. <span className="span"> & Lorem, ipsum.</span>
              </h5>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Asperiores consectetur, assumenda inventore nihil sunt
                doloremque ullam consequuntur dignissimos nisi mollitia?
              </p>
            </div>

            <picture className="w-full md:w-1/2">
              <img
                src="https://images.unsplash.com/photo-1671938576119-9e1c53d868dc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80 "
                alt=""
              />
            </picture>
          </div>

          <div className="flex flex-col md:flex-row gap-16">
            <picture className="w-full md:w-1/2">
              <img
                src="https://images.unsplash.com/photo-1671923526951-cbe84a6cfde0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1364&q=80"
                alt=""
              />
            </picture>

            <div className="w-full space-y-2 flex flex-col justify-center">
              <h1 className="text-5xl">Misyonumuz</h1>
              <h5>
                Lorem. <span className="span"> & Lorem, ipsum.</span>
              </h5>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Asperiores consectetur, assumenda inventore nihil sunt
                doloremque ullam consequuntur dignissimos nisi mollitia?
              </p>
            </div>
          </div>
        </section>
      </Layout>
    </div>
  );
};

export default AboutUs;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const data = await api();
  return {
    props: {
      data: data,
    },
  };
};
// BETÜLÜ SEVİYORUM
