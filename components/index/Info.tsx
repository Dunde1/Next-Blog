import Image from 'next/image';

const Info = () => {
  return (
    <>
      <div className="info">
        <section className="img-background">
          <Image src="/images/wallpaper.jpg" layout="fill" objectFit="cover" alt="profile-wallpaper-img" />
        </section>
        <section className="img-profile">
          <Image src="/images/profile.jpg" layout="fill" objectFit="cover" alt="profile-img" />
        </section>
      </div>
      <style jsx>
        {`
          .info {
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
            width: 100%;
            height: 100%;
            background-color: rgb(187, 187, 187);
          }

          .img-background {
            position: relative;
            width: 100%;
            height: 30vh;
            border-bottom: 5px solid whitesmoke;
          }

          .img-profile {
            position: absolute;
            width: 25vw;
            height: 25vw;
            top: 30vh;
            left: 15vh;
            transform: translateY(-50%);
            border: 5px solid whitesmoke;
            border-radius: 50%;
            overflow: hidden;
          }

          .img-profile img {
          }
        `}
      </style>
    </>
  );
};

export default Info;
