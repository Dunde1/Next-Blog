const Posts = () => {
  return (
    <>
      <div className="posts">posts</div>
      <style jsx>{`
        .posts {
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: center;
          width: 100%;
          height: 100%;
          background-color: steelblue;
        }
      `}</style>
    </>
  );
};

export default Posts;
