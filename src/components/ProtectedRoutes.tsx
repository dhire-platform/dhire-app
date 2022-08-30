import { usePersistanceStore } from 'src/app/persistanceStore';
//check if you are on the client (browser) or server
const isBrowser = () => typeof window !== 'undefined';

const ProtectedRoute = ({ router, children }: any) => {
  const { userId } = usePersistanceStore();

  const unprotectedRoutes = ['/', '/jobs', '/hire'];
  /**
   * @var pathIsProtected Checks if path exists in the unprotectedRoutes routes array
   */
  const pathIsProtected = unprotectedRoutes.indexOf(router.pathname) === -1;

  if (isBrowser() && !userId && pathIsProtected) {
    console.log('user is not logged in and path is protected');
    router.push('/');
  }
  console.log('user is logged in and path is not protected', pathIsProtected);
  return children;
};

export default ProtectedRoute;
