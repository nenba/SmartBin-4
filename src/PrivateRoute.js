import { Route, Navigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import firebase from 'firebase/app';
import 'firebase/auth';

const PrivateRoute = ({ element, ...rest }) => {
  const [user] = useAuthState(firebase.auth());

  return (
    <Route {...rest} element={user ? element : <Navigate to="/login" />} />
  );
};

export default PrivateRoute;
