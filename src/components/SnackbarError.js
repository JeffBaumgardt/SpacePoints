import React from 'react'
import PropTypes from 'prop-types'
import {Snackbar, SnackbarContent, IconButton} from '@material-ui/core'
import {Error, Close} from '@material-ui/icons'
import {makeStyles} from '@material-ui/core/styles'
import clsx from 'clsx'

const useErrorStyles = makeStyles(theme => ({
	error: {
		backgroundColor: theme.palette.error.dark,
	},
	icon: {
		fontSize: 20,
	},
	iconVariant: {
		opacity: 0.9,
		marginRight: theme.spacing(1),
	},
	message: {
		display: 'flex',
		alignItems: 'center',
	},
}))

function SnackbarError({className, message, error, onClose, ...other}) {
	const classes = useErrorStyles()

	return (
		<Snackbar
			anchorOrigin={{
				vertical: 'bottom',
				horizontal: 'left',
			}}
			open={!!message}
			autoHideDuration={6000}
			onClose={onClose}
		>
			<SnackbarContent
				className={clsx(classes.error, className)}
				aria-describedby="client-snackbar"
				message={
					<span id="client-snackbar" className={classes.message}>
						<Error className={clsx(classes.icon, classes.iconVariant)} />
						{message}
					</span>
				}
				action={[
					<IconButton key="close" aria-label="Close" color="inherit" onClick={onClose}>
						<Close className={classes.icon} />
					</IconButton>,
				]}
				{...other}
			/>
		</Snackbar>
	)
}

SnackbarError.propTypes = {
	className: PropTypes.string,
	message: PropTypes.node,
	onClose: PropTypes.func,
}

export default SnackbarError
