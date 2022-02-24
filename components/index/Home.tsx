const Home = () => {
  return (
    <>
      <div className="home">
        <span className="logo">Dunde's Blog</span>
      </div>

      <style jsx>
        {`
          .home {
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 100%;
            background-color: rgb(255, 235, 140);
          }

          .logo {
            position: relative;
            font-family: sandol-outline;
            font-size: 10vw;
            color: rgb(0, 0, 0);
          }

          .logo::after {
            content: '';
            position: absolute;
            width: 100%;
            height: 100%;
            transform: translate(-100%, 80%) scaleY(0.3);
            background-color: rgba(0, 0, 0, 0.5);
            border-radius: 50%;
          }
        `}
      </style>
    </>
  );
};

export default Home;
