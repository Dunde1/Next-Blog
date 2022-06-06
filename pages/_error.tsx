import ErrorRender from '@render/pages/static/_error/_error.render';
import ErrorServer from '@server/pages/static/_error/_error.server';

const CustomError = ErrorRender;
CustomError.getInitialProps = ErrorServer;
export default CustomError;
