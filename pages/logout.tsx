import { logoutMutation } from '../graphql/user/mutations/logout';
import { MyNextContext } from '../interfaces/MyNextContext';
import redirect from '../lib/redirect';

const Logout = () => {
  return null;
};

Logout.getInitialProps = async ({ apolloClient, ...ctx }: MyNextContext) => {
  await apolloClient.mutate({ mutation: logoutMutation });
  await apolloClient.resetStore();
  redirect(ctx, '/login');
  return {};
};

export default Logout;
