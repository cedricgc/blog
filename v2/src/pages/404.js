import * as React from 'react';
import { Link } from 'gatsby';

const NotFoundPage = () => {
  return (
    <main>
      <title>Page Not Found</title>
      <h1>Page Not Found</h1>
      <p>Sorry, the page you were looking for doesn't exist.</p>
      <Link to="/">Go home</Link>
    </main>
  );
};

export default NotFoundPage;
