import React from 'react';
import { NavLink } from 'react-router-dom';

const pageLinks = [
  { label: 'STC.ITGPRC_ITG Compliance Overview', path: '/' },
  { label: 'STC.ITGPRC_ITG Operations Control Status', path: '/operations-control-status' }
];

const PageTabs = (): React.JSX.Element => {
  return (
    <div className="border-t border-border bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap gap-3 py-4 overflow-x-auto">
          {pageLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `min-w-[220px] rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-wide transition ${
                  isActive
                    ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-200'
                    : 'bg-transparent border-border text-muted-foreground hover:text-foreground'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PageTabs;
