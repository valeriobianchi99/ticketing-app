import Link from 'next/link'

const CustomHeader = ({ currentUser }) => {

    const links = [
        !currentUser && { label: 'Sign up', href: '/auth/signup' },
        !currentUser && { label: 'Sign in', href: '/auth/signin' },
        currentUser && { label: 'Sell tickets', href: '/tickets/new' },
        currentUser && { label: 'My Orders', href: '/orders' }
    ].filter(
        linkConfig => !!linkConfig
    ).map(
        ({ label, href }, index) => {
        return (
            <li key={index} className='nav-item'>
                <Link href={href}>{label}</Link>
            </li>
        )
        }
    )

    return <nav className="navbar navbar-light bg-light">
        <Link href="/">
            <a className='navbar-brand'>GitTix</a>
        </Link>

        <div className='d-flex justify-content-end'>
            <ul className='nav d-flex align-items-center'>
                {links}
            </ul>
        </div>
    </nav>
}

export default CustomHeader;