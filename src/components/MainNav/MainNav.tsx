import { useEffect, useState } from 'react';
import './MainNav.scss';

export default function MainNav() {
    const [hidden, setHidden] = useState(false);
    const [prevScroll, setPrevScroll] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
        const currentScroll = window.scrollY;

        console.log(currentScroll);

        if (currentScroll <= 0 || Math.abs(currentScroll - prevScroll) < 100) return; 

        if (currentScroll < prevScroll) {
            setHidden(false); 
        } else {
            setHidden(true);
        }

        setPrevScroll(currentScroll);
        };

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, [prevScroll]);

    return (
        <div className={`main-nav ${hidden ? "hidden" : ""}`}>
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