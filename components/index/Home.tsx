export type HomeProps = {
  today: number;
  total: number;
};

const Home = ({ today, total }: HomeProps) => {
  return (
    <>
      <div className="home">
        <div className="logo">
          <span data-logo="d">d</span>
          <span data-logo="u">u</span>
          <span data-logo="n">n</span>
          <span data-logo="d">d</span>
          <span data-logo="e">e</span>
        </div>
        <div className="visitor">
          <span className="visit-counter">
            {today} <span>{' TODAY'}</span>
          </span>
          <span className="visit-counter">
            {total} <span>{' TOTAL'}</span>
          </span>
        </div>
      </div>

      <style jsx>
        {`
          .home {
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 15vh;
            width: 100%;
            height: 100%;
            background-image: linear-gradient(70deg, rgb(158, 148, 219), rgb(186, 176, 255), rgb(186, 176, 255), rgb(158, 148, 219));
          }

          .logo {
            position: relative;
            transform-style: preserve-3d;
            perspective: 2000px;
            transform: rotate3d(2, 3, -1, 40deg);
          }

          .logo > span {
            position: relative;
            font-family: BR;
            font-size: 20vw;
            color: rgba(255, 244, 94, 0.5);
            text-transform: uppercase;
            transform-style: preserve-3d;
            perspective: 2000px;
            text-shadow: 1px 4px 6px rgb(230, 226, 223), 0 0 0 rgb(33, 0, 109), 1px 4px 6px rgb(158, 148, 219);
          }

          .logo > span::before {
            content: attr(data-logo);
            position: absolute;
            width: 100%;
            height: 50%;
            top: 0;
            left: 0;
            color: rgb(255, 255, 255);
            overflow: hidden;
            transform-origin: center bottom;
            transform: rotateX(0deg);
            transition: all 0.5s ease-out;
          }

          .logo > span:hover::before {
            color: rgb(245, 245, 245);
            text-shadow: 2px -1px 6px rgba(0, 0, 0, 0.2);
            transform: rotateX(-30deg);
          }

          .logo > span::after {
            content: attr(data-logo);
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            color: rgb(255, 255, 255);
            transform-origin: center center;
            clip-path: polygon(0 49.5%, 100% 49.5%, 100% 100%, 0% 100%);
            transition: all 0.5s ease-out;
          }

          .logo > span:hover::after {
            color: rgb(211, 211, 211);
            text-shadow: 2px -1px 6px rgba(0, 0, 0, 0.2);
            transform: rotateX(30deg);
          }

          .visitor {
            display: flex;
            flex-direction: column;
            gap: 1vh;
          }

          .visit-counter {
            font-family: LABDigital;
            font-size: 5vw;
          }

          .visit-counter > span {
            font-family: BMJUA;
            font-size: 3vw;
          }
        `}
      </style>
    </>
  );
};

export default Home;
