import Link from 'next/link';

const Posts = () => {
  return (
    <>
      <div className="posts">
        <Link href="/posts">
          <a target="_blank">Go to my posts page</a>
        </Link>
      </div>
      <style jsx>{`
        .posts {
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 100%;
          background-color: steelblue;
        }

        a {
          font-size: 50px;
          font-family: BR;
          color: whitesmoke;
          text-transform: uppercase;
          transition: text-shadow 0.2s;
        }

        a:hover {
          text-shadow: 5px 5px 10px rgba(0, 0, 0, 0.5);
        }

        a::after {
          content: '▸';
          position: absolute;
          visibility: hidden;
          transform: translate(-20px, -50px) rotateZ(-180deg);
          opacity: 0;
          transition: all 0.5s;
        }

        a:hover::after {
          visibility: visible;
          transform: translateX(0) rotateZ(0);
          opacity: 1;
        }
      `}</style>
    </>
  );
};

export default Posts;
