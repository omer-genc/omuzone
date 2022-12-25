import { GetServerSideProps } from 'next';
import React from 'react';
import api, { IRes } from '../bloc/api';
import Layout from '../components/Layout';

type Props = {
  data: IRes
}
const AboutUs:React.FC<Props> = ({data}) => {
  return <div>
    <Layout isOneColor={true} categories={data.kategoriler} >
      <br />
      <br />
      <br />
      <br />
      <br />
    <section className='about'>
      <div className='main'>
        <picture>
          <img src="https://images.unsplash.com/photo-1671938576119-9e1c53d868dc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80 " alt="" />
        </picture>

        <div className='about-text'>
          <h1>About Us</h1>
          <h5>Developer <span className='span'> & Designer</span></h5>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Asperiores consectetur, assumenda inventore nihil sunt doloremque ullam consequuntur dignissimos nisi mollitia?</p>
          <button className='button' type='button'>let's talk</button>
        </div>
      </div>

      <div className='main'>
        

        <div className='about-text'>
          <h1>About Us</h1>
          <h5>Developer <span> & Designer</span></h5>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Asperiores consectetur, assumenda inventore nihil sunt doloremque ullam consequuntur dignissimos nisi mollitia?</p>
          <button type='button'>let's talk</button>
        </div>

        <picture>
          <img src="https://images.unsplash.com/photo-1671938576119-9e1c53d868dc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80 " alt="" />
        </picture>
      </div>

    </section>
    </Layout>
  </div>;
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
