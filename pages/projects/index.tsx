import { NextPage } from 'next';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import HeadComponent from '../../components/HeadComponent';
import threejsList from './threejs/index.json';
import Image from 'next/image';
import Link from 'next/link';
import { Dispatch, SetStateAction, useState } from 'react';

const Card = ({
  title,
  description,
  imgSrc,
  link,
  setIsLoading,
}: {
  title: string;
  description: string;
  imgSrc: string;
  link: string;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <div className="swiper">
      <div className="card">
        <Link href={`/projects/${link}`}>
          <a onClick={() => setIsLoading(true)} />
        </Link>
        <div className="img">
          <Image src={imgSrc} layout="fill" objectFit="cover" alt={title} />
        </div>
        <div className="contents">
          <h1>{title}</h1>
          <h4>{description}</h4>
        </div>
      </div>

      <style jsx>
        {`
          div.swiper {
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 0 10px;
          }

          div.card {
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 300px;
            border: 1px solid white;
            box-sizing: content-box;
          }

          div.card > a {
            position: absolute;
            width: 100%;
            height: 100%;
            z-index: 1;
          }

          div.img {
            position: relative;
            width: 300px;
            height: 200px;
            border: 1px solid white;
          }

          div.contents {
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 10px;
            padding: 10px;
            word-break: keep-all;
          }

          h1,
          h4 {
            margin: 0;
            color: whitesmoke;
          }
        `}
      </style>
    </div>
  );
};

const Projects: NextPage = () => {
  const breakpoint = {
    3000: {
      slidesPerView: 9,
    },
    2700: {
      slidesPerView: 8,
    },
    2400: {
      slidesPerView: 7,
    },
    2100: {
      slidesPerView: 6,
    },
    1800: {
      slidesPerView: 5,
    },
    1500: {
      slidesPerView: 4,
    },
    1200: {
      slidesPerView: 3,
    },
    900: {
      slidesPerView: 2,
    },
    600: {
      slidesPerView: 1,
    },
  };

  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <div className="projects">
      <HeadComponent title="projects" description="List of works I've made" />
      <h1>Project List</h1>

      <section className="threejs">
        <h2>Three.js</h2>
        <div>
          <Swiper slidesPerView={10} breakpoints={breakpoint} loop={true} autoplay={{ delay: 2000 }}>
            {threejsList.map(({ title, description, imgSrc, link }, i) => (
              <SwiperSlide key={i}>
                <Card title={title} description={description} imgSrc={imgSrc} link={link} setIsLoading={setIsLoading} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      <div className="loading" />

      <style jsx>
        {`
          div.projects {
            position: relative;
            flex-direction: column;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            background-color: rgba(0, 0, 0, 0.8);
            gap: 100px;
            min-height: 100vh;
          }

          h1,
          h2 {
            color: white;
          }

          section {
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 90%;
            box-sizing: content-box;
            border: 1px solid white;
          }

          section > div {
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            box-sizing: content-box;
            border: 1px solid white;
            background-color: rgba(0, 0, 0, 0.2);
          }

          div.loading {
            position: absolute;
            display: ${isLoading ? 'flex' : 'none'};
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.8);
            z-index: 99;
          }

          div.loading::before {
            content: '';
            position: absolute;
            width: min(10vw, 10vh);
            height: min(10vw, 10vh);
            border: 10px solid whitesmoke;
            animation: rotate 1s ease-in-out infinite;
          }

          @keyframes rotate {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }

          div.loading::after {
            content: '●';
            position: absolute;
            display: flex;
            justify-content: center;
            align-items: center;
            width: min(10vw, 10vh);
            height: min(10vw, 10vh);
            color: whitesmoke;
            animation: dot 1s infinite;
          }

          @keyframes dot {
            0% {
              content: '●';
            }
            33% {
              content: '●●';
            }
            66% {
              content: '●●●';
            }
          }
        `}
      </style>
    </div>
  );
};

export default Projects;
