import { NextPage } from 'next';

type propsType = {
  statusCode: number | undefined;
};

const CustomError: NextPage<propsType> = ({ statusCode }) => {
  return (
    <div>
      <h1>this is error page, code: {statusCode}</h1>
      <button onClick={() => (window.location.href = '/')}> back to main</button>
      <style jsx>
        {`
          div {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 100vh;
            background-color: gray;
          }
          div > h1 {
            color: white;
          }

          div > button {
            position: relative;
            font-size: larger;
            font-weight: bolder;
            color: white;
          }

          div > button::before {
            content: '◂';
            position: absolute;
            right: 100%;
            animation: left-move 1s ease-in-out infinite;
          }

          @keyframes left-move {
            0% {
              transform: translateX(-10px);
            }
            50% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-10px);
            }
          }
        `}
      </style>
    </div>
  );
};

export default CustomError;

CustomError.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};
