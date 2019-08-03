import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import {Grid, Fab} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import ProfileImage from 'components/ProfileImage'
import {number} from 'utils'

const ButtonLink = React.forwardRef((props, ref) => <Link innerRef={ref} {...props} />)

const useStyles = makeStyles(theme => ({
	kidGrid: {
		marginTop: theme.spacing(2),
	},
	kidButton: {
		height: 80,
		width: 80,
		overflow: 'hidden',
		borderRadius: '50%',
	},
	kidImage: {
		height: 80,
		width: 80,
	},
	addKid: {
		color: 'white',
	},
	points: {
		position: 'absolute',
		width: 80,
		backgroundColor: 'rgba(0,0,0,.2)',
		padding: `${theme.spacing(1)}px 0`,
		right: 0,
		bottom: 0,
		textAlign: 'center',
		color: 'white',
		fontSize: theme.spacing(1),
		lineHeight: `${theme.spacing(1)}px`,
	},
}))

function Home({kids}) {
	const classes = useStyles()

	return (
		<Grid
			container
			alignItems="flex-start"
			direction="row"
			justify="center"
			className={classes.kidGrid}
		>
			{kids.map(kid => (
				<Grid item container justify="center" xs={6} key={kid.id}>
					<Fab className={classes.kidButton} component={ButtonLink} to={`/kid/${kid.id}`}>
						<ProfileImage name={kid.name} image={kid.image} className={classes.kidImage} />
						<span className={classes.points}>{number(kid.points)}></span>
					</Fab>
				</Grid>
			))}
		</Grid>
	)
}

Home.propTypes = {
	kids: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string.isRequired,
			image: PropTypes.string,
			name: PropTypes.string.isRequired,
		})
	),
}

export default Home
