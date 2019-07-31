import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import {Link} from 'react-router-dom'
import {Grid, Fab} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import ProfileImage from 'components/ProfileImage'
import {Add} from '@material-ui/icons'

const ButtonLink = React.forwardRef((props, ref) => <Link innerRef={ref} {...props} />)

const useStyles = makeStyles(theme => ({
	kidGrid: {
		marginTop: theme.spacing(2),
	},
	kidButton: {
		height: 80,
		width: 80,
	},
	kidImage: {
		height: 80,
		width: 80,
		backgroundColor: 'transparent',
	},
	addKid: {
		color: 'white',
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
					</Fab>
				</Grid>
			))}
			<Grid item container justify="center" xs={6}>
				<Fab
					className={clsx(classes.kidButton, classes.addKid)}
					component={ButtonLink}
					to="/kid/new"
				>
					<Add />
				</Fab>
			</Grid>
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
