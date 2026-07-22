import { createPortal } from 'react-dom';
import { useState, useMemo } from 'react';
import type { Expense } from '../../../models/expense';
import { formatCOP, formatMonthYear } from '../../../utils/format';
import './LimitsModal.scss';

type Props = {
    isOpen: boolean;
    onClose: () => void;
    expenses: Expense[];
};

const JAIR_LIMIT = 492000;
const ANYELLY_LIMIT = 807000;

export default function LimitsModal({ isOpen, onClose, expenses }: Props) {
    const [selectedMonth, setSelectedMonth] = useState(() => {
        const now = new Date();
        return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
    });

    const jairSpent = useMemo(() => {
        return expenses
            .filter((e) => e.month === selectedMonth && e.person === 'Jair')
            .reduce((sum, e) => sum + Number(e.amount), 0);
    }, [expenses, selectedMonth]);

    const anyellySpent = useMemo(() => {
        return expenses
            .filter((e) => e.month === selectedMonth && e.person === 'Anyelly')
            .reduce((sum, e) => sum + Number(e.amount), 0);
    }, [expenses, selectedMonth]);

    if (!isOpen) return null;

    const calcPercent = (spent: number, limit: number) => {
        if (limit <= 0) return 0;
        return Math.round((spent / limit) * 100);
    };

    const jairPercent = calcPercent(jairSpent, JAIR_LIMIT);
    const anyellyPercent = calcPercent(anyellySpent, ANYELLY_LIMIT);

    const isJairExceeded = jairSpent > JAIR_LIMIT;
    const isAnyellyExceeded = anyellySpent > ANYELLY_LIMIT;

    return createPortal(
        <div className="limits-modal-overlay" onClick={onClose}>
            <div className="limits-modal" onClick={(e) => e.stopPropagation()}>
                <div className="limits-modal__header">
                    <div>
                        <h2 className="limits-modal__title">Monthly Limits</h2>
                        <span className="limits-modal__subtitle">
                            {selectedMonth ? formatMonthYear(selectedMonth) : ''}
                        </span>
                    </div>
                    <button className="limits-modal__close-btn" onClick={onClose}>
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                <div className="limits-modal__month-selector">
                    <label className="month-selector-label">Select Month</label>
                    <input
                        type="month"
                        className="month-selector-input"
                        value={selectedMonth}
                        onChange={(e) => setSelectedMonth(e.target.value)}
                    />
                </div>

                <div className="limits-modal__body">
                    {/* Jair Limit Section */}
                    <div className={`limits-card ${isJairExceeded ? 'limits-card--exceeded' : ''}`}>
                        <div className="limits-card__header">
                            <span className="limits-card__name">Jair</span>
                            <span className={`limits-card__badge ${isJairExceeded ? 'limits-card__badge--exceeded' : jairPercent > 85 ? 'limits-card__badge--warning' : ''}`}>
                                {isJairExceeded ? `${jairPercent}% (Exceeded)` : `${jairPercent}%`}
                            </span>
                        </div>
                        <div className="limits-card__bar-container">
                            <div
                                className={`limits-card__bar-fill ${isJairExceeded ? 'limits-card__bar-fill--exceeded' : jairPercent > 85 ? 'limits-card__bar-fill--warning' : ''}`}
                                style={{ width: `${Math.min(jairPercent, 100)}%` }}
                            />
                        </div>
                        <div className="limits-card__numeric">
                            <div className="limits-card__stat">
                                <span className="stat-label">Spent</span>
                                <span className={`stat-value ${isJairExceeded ? 'stat-value--exceeded' : ''}`}>
                                    {formatCOP(jairSpent)}
                                </span>
                            </div>
                            <div className="limits-card__divider">/</div>
                            <div className="limits-card__stat">
                                <span className="stat-label">Limit</span>
                                <span className="stat-value">{formatCOP(JAIR_LIMIT)}</span>
                            </div>
                        </div>
                        {isJairExceeded && (
                            <div className="limits-card__exceeded-alert">
                                <span className="material-symbols-outlined alert-icon">warning</span>
                                <span>Exceeded by {formatCOP(jairSpent - JAIR_LIMIT)}</span>
                            </div>
                        )}
                    </div>

                    {/* Anyelly Limit Section */}
                    <div className={`limits-card ${isAnyellyExceeded ? 'limits-card--exceeded' : ''}`}>
                        <div className="limits-card__header">
                            <span className="limits-card__name">Anyelly</span>
                            <span className={`limits-card__badge ${isAnyellyExceeded ? 'limits-card__badge--exceeded' : anyellyPercent > 85 ? 'limits-card__badge--warning' : ''}`}>
                                {isAnyellyExceeded ? `${anyellyPercent}% (Exceeded)` : `${anyellyPercent}%`}
                            </span>
                        </div>
                        <div className="limits-card__bar-container">
                            <div
                                className={`limits-card__bar-fill ${isAnyellyExceeded ? 'limits-card__bar-fill--exceeded' : anyellyPercent > 85 ? 'limits-card__bar-fill--warning' : ''}`}
                                style={{ width: `${Math.min(anyellyPercent, 100)}%` }}
                            />
                        </div>
                        <div className="limits-card__numeric">
                            <div className="limits-card__stat">
                                <span className="stat-label">Spent</span>
                                <span className={`stat-value ${isAnyellyExceeded ? 'stat-value--exceeded' : ''}`}>
                                    {formatCOP(anyellySpent)}
                                </span>
                            </div>
                            <div className="limits-card__divider">/</div>
                            <div className="limits-card__stat">
                                <span className="stat-label">Limit</span>
                                <span className="stat-value">{formatCOP(ANYELLY_LIMIT)}</span>
                            </div>
                        </div>
                        {isAnyellyExceeded && (
                            <div className="limits-card__exceeded-alert">
                                <span className="material-symbols-outlined alert-icon">warning</span>
                                <span>Exceeded by {formatCOP(anyellySpent - ANYELLY_LIMIT)}</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
}

