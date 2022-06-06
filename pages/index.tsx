import IndexServer from '@server/pages/index/index.server';
import IndexRender from '@render/pages/index/index.render';

const Index = IndexRender;
export default Index;

export const getServerSideProps = IndexServer;
