import React from 'react';
export default (ListComponent) => {
	return (props) => {
		return <ListComponent {...props} />;
	};
};
