import { useEffect, useState } from 'react';
import './MainNav.scss';
import { useCreateForm } from '../../contexts/useCreateForm';
import type { Expense } from '../../models/expense';
import LimitsModal from '../Modals/LimitsModal/LimitsModal';

type Props = {
    expenses: Expense[];
}

export default function MainNav({ expenses }: Props) {
    const [hidden, setHidden] = useState(false);
    const [prevScroll, setPrevScroll] = useState(0);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLimitsModalOpen, setIsLimitsModalOpen] = useState(false);

    const { isCreateModalOpen, openCreateModal, closeCreateModal } = useCreateForm();

    useEffect(() => {
        const handleScroll = () => {
        const currentScroll = window.scrollY;

        if (currentScroll <= 0 || Math.abs(currentScroll - prevScroll) < 100) return; 

        if (currentScroll < prevScroll) {
            setHidden(false); 
        } else {
            setHidden(true);
            setIsMenuOpen(false);
        }

        setPrevScroll(currentScroll);
        };

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, [prevScroll]);

    const handleLimitsClick = () => {
        setIsLimitsModalOpen(true);
        setIsMenuOpen(false);
    };

    return (
        <>
            <div className={`main-nav ${hidden ? "hidden" : ""}`}>
                <div className='main-nav__app-logo'>
                    <span className='main-nav__app-logo--text'>Home Expenses</span>
                </div>
                <div className='main-nav__menu'>
                    <span 
                        className={`material-symbols-outlined main-nav__menu--apps ${isMenuOpen ? 'active' : ''}`}
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        apps
                    </span>
                    <span 
                        className="material-symbols-outlined main-nav__menu--create"
                        onClick={ !isCreateModalOpen ? openCreateModal : closeCreateModal }
                    >
                        add_2
                    </span>
                </div>

                {isMenuOpen && (
                    <>
                        <div className="main-nav__dropdown-backdrop" onClick={() => setIsMenuOpen(false)} />
                        <div className="main-nav__dropdown">
                            <div className="main-nav__dropdown-item" onClick={handleLimitsClick}>
                                <span className="material-symbols-outlined item-icon">bar_chart</span>
                                <span className="item-text">Limits</span>
                            </div>
                        </div>
                    </>
                )}
            </div>

            <LimitsModal
                isOpen={isLimitsModalOpen}
                onClose={() => setIsLimitsModalOpen(false)}
                expenses={expenses}
            />
        </>
    )
}