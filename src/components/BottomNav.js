import React from 'react'
import PropTypes from 'prop-types'
import {NavLink} from 'react-router-dom'
import {BottomNavigation, BottomNavigationAction} from '@material-ui/core'
import {Cake, GroupAdd, Home} from '@material-ui/icons'

const ButtonLink = React.forwardRef((itemProps, ref) => <NavLink {...itemProps} innerRef={ref} />)

function BottomNav({className}) {
	return (
		<BottomNavigation showLabels className={className}>
			<BottomNavigationAction
				label="Family"
				icon={<GroupAdd />}
				to="/family"
				component={ButtonLink}
			/>
			<BottomNavigationAction label="Home" icon={<Home />} to="/" component={ButtonLink} />
			<BottomNavigationAction
				label="Rewards"
				icon={<Cake />}
				to="/rewards"
				component={ButtonLink}
			/>
		</BottomNavigation>
	)
}

BottomNav.propTypes = {
	className: PropTypes.string
}

export default BottomNav
