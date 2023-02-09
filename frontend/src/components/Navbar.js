import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSelector, useDispatch} from 'react-redux';
import { logout } from '../actions/auth/auth';
import theme from '../theme/theme';

const Navbar = () => {

    const dispatch = useDispatch();
    const router = useRouter();

    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    const logoutHandler = () => {
        if(dispatch && dispatch !== null && dispatch !== undefined )
            dispatch(logout());
    };

    const authLinks = (
        <>
        
            <li className='nav-item'>
                <Link href='/dashboard'>
                    <a className={
                        router.pathname === '/dashboard' ? 
                        'nav-link active' : 'nav-link'
                    }>
                        Dashboard
                    </a>
                </Link>
            </li>
            <li className='nav-item'>
                <Link href='/place'>
                    <a className={
                        router.pathname === '/place' ? 
                        'nav-link active' : 'nav-link'
                    }>
                        Place
                    </a>
                </Link>
            </li>
            <li className='nav-item'>
                <Link href='/favorite'>
                    <a className={
                        router.pathname === '/favorite' ? 
                        'nav-link active' : 'nav-link'
                    }>
                        Favorite
                    </a>
                </Link>
            </li>
            <li className='nav-item'>
                <Link href='/review'>
                    <a className={
                        router.pathname === '/review' ? 
                        'nav-link active' : 'nav-link'
                    }>
                        Review
                    </a>
                </Link>
            </li>
            <li className='nav-item'>
                <Link href='/match'>
                    <a className={
                        router.pathname === '/match' ? 
                        'nav-link active' : 'nav-link'
                    }>
                        Match
                    </a>
                </Link>
            </li>
            <li className='nav-item'>
                <a 
                    className='nav-link'
                    href='#!'
                    onClick={logoutHandler}
                >
                    Logout
                </a>
            </li>
        </>
    );

    const guestLinks = (
        <>
            <li className='nav-item'>
                <Link href='/register'>
                    <a className={router.pathname === '/register' ? 'nav-link active' : 'nav-link'}>
                        Register
                    </a>
                </Link>
            </li>
            <li className='nav-item'>
                <Link href='/login'>
                    <a className={router.pathname === '/login' ? 'nav-link active' : 'nav-link'}>
                        Login
                    </a>
                </Link>
            </li>
        </>
    );

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <nav className='navbar navbar-expand-lg bg-light'>
                <div className='container-fluid'>
                    <Link href='/'>
                        <a className='navbar-brand'>
                            스꾸친
                        </a>
                    </Link>
                    <button className='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#navbarNav' aria-controls='navbarNav' aria-expanded='false' aria-label='Toggle navigation'>
                    <span className='navbar-toggler-icon'></span>
                    </button>
                    <div className='collapse navbar-collapse' id='navbarNav'>
                        <ul className='navbar-nav'>
                            <li className='nav-item'>
                                <Link href='/'>
                                    <a className={router.pathname === '/' ? 'nav-link active' : 'nav-link'}>
                                        Home
                                    </a>
                                </Link>
                            </li>
                            {
                                isAuthenticated ? authLinks: guestLinks
                            }
                        </ul>
                    </div>
                </div>
            </nav>
        </ThemeProvider>
)};

export default Navbar;