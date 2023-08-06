import React from 'react';
import Link from 'next/link';
import { useUser } from '@auth0/nextjs-auth0/client';
import { Button, Dropdown, Spinner } from 'react-bootstrap';
import Image from 'next/image';

function User() {
  const { user, error, isLoading } = useUser();

  if (isLoading)
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  if (error) return <div>{error.message}</div>;

  return (
    <div>
      {user ? (
        <Dropdown>
          <Dropdown.Toggle as={'div'} className="userBtn">
            <Image src={'/avatar.png'} alt="Avatar" width={35} height={35} />
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item>
              <Link href={'/api/auth/logout'} className='logoutLink'>Logout</Link>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      ) : (
        <Link href="/api/auth/login">
          <Button variant="primary">Login</Button>
        </Link>
      )}
    </div>
  );
}

export default User;