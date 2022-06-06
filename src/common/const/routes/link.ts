const https = (link: string) => (`https://${link}`);

export const MY = {
  GITHUB: https('github.com/Dunde1'),
  GITHUB_BLOG: https('Dunde1.github.io'),
  VELOG: https('velog.io/@dunde'),
  PROJECT: {
    LIARKING: https('liarking.r-e.kr'),
  },
};

export const THIS_BLOG = {
  MAIN: '/',
  POSTS: '/posts',
  PROJECTS: '/projects',
};
