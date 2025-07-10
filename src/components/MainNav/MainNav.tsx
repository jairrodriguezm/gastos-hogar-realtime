import './MainNav.scss';

export default function MainNav() {
    return (
        <div className='main-nav'>
            <div className='main-nav__app-logo'>
                <span className='main-nav__app-logo--text'>Home Expenses</span>
            </div>
            <div className='main-nav__menu'>
                <span className="material-symbols-outlined main-nav__menu--apps">apps</span>
                <span className="material-symbols-outlined main-nav__menu--create">add_2</span>
            </div>
        </div>
    )
}