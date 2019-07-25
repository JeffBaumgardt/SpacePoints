import React from 'react'
import PropTypes from 'prop-types'
import * as store from 'lib/store'
import {useUser} from 'context/user'
import {
	Button,
	Collapse,
	Dialog,
	DialogContent,
	DialogTitle,
	DialogContentText,
	TextField,
	DialogActions,
} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import SnackbarError from 'components/SnackbarError'

const useFamilyStyles = makeStyles(theme => ({
	margin: {
		margin: theme.spacing(1),
	},
	optionSelections: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center'
	},
	buttonMargin: {
		marginRight: theme.spacing(1)
	}
}))

function JoinFamily({completeFamily}) {
	const {email} = useUser()
	const classes = useFamilyStyles()

	const [open, setOpen] = React.useState(true)
	const [error, setError] = React.useState(null)
	const [optionShown, setOptionShown] = React.useState(null)

	const [familyName, setFamilyName] = React.useState('')
	const [familyEmail, setFamilyEmail] = React.useState('')

	const resetValues = () => {
		setError(null)
		setOptionShown(null)
		setFamilyName('')
		setFamilyEmail('')
	}

	const handleOptionSelection = option => () => {
		setOptionShown(option)
	}

	const handleCancelAction = () => {
		resetValues()
	}

	const handleFamilyName = event => {
		setFamilyName(event.target.value)
	}

	const handleFamilyEmail = event => {
		setFamilyEmail(event.target.value)
	}

	const handleErrorClose = () => {
		setError(null)
		setFamilyName('')
		setFamilyEmail('')
	}

	const addSelfToFamily = async (familyId, emailAddress) => {
		try {
			return await store.addAdultToFamily(familyId, emailAddress)
		} catch (error) {
			if (error.message === 'no-family') {
				setError('Unable to add user to family, please try again')
			}
		}
	}

	const createFamily = async () => {
		if (!familyName || familyName.length === 0) {
			setError('You must enter a family name to continue')
		} else {
			const familyId = await store.createFamily(familyName)
			const result = await addSelfToFamily(familyId, email)

			if (result === 'success') {
				setOpen(false)
				resetValues()
				const family = await store.getFamily(familyId)
				completeFamily(family)
			} else {
				setError('There was a problem creating your family')
			}
		}
	}

	const joinFamily = async () => {
		if (!familyEmail || familyEmail.length === 0) {
			setError('You must enter a email address of a family member')
		} else {
			try {
				const family = await store.findFamilyByEmail(familyEmail)
				const result = await addSelfToFamily(family.id, email)

				if (result === 'success') {
					setOpen(false)
					resetValues()
					completeFamily(family)
				} else {
					setError('There was a problem adding user to family')
				}
			} catch (error) {
				if (error.message === 'family-not-found') {
					setError('No family found with that email address, try again?')
					setFamilyEmail('')
				}
			}
		}
	}

	const handleSubmit = () => {
		if (optionShown === 'create') {
			createFamily()
		} else if (optionShown === 'join') {
			joinFamily()
		}
	}

	return (
		<>
			<Dialog open={open} aria-labelledby="form-dialog-title" fullWidth maxWidth="xl">
				<DialogTitle id="form-dialog-title">Create or Join a Family</DialogTitle>
				<DialogContent>
					<Collapse in={!optionShown}>
						<div>
							<DialogContentText color='textPrimary' variant='subtitle1'>
								Please select to create a family or join an existing family
							</DialogContentText>
							<DialogContentText color='textPrimary' variant='body2'>
								Creating a new family will simply create a new family, it will not check if a
								family by the same name exists. Joining a family requires an existing family and a
								email address of a member in that family. It's suggested that you try to join a
								family first.
							</DialogContentText>
							<div className={classes.optionSelections}>
								<Button color="primary" variant='contained' value="create" className={classes.buttonMargin} onClick={handleOptionSelection('create')}>
									Create
								</Button>
								<Button color="primary" variant='contained' value="join" onClick={handleOptionSelection('join')}>
									Join
								</Button>
							</div>
						</div>
					</Collapse>
					<Collapse in={optionShown === 'create'}>
						<div>
							<DialogContentText>
								To continue, you need to create a new family. Please enter your family name below.
							</DialogContentText>
							<TextField
								autoFocus
								onChange={handleFamilyName}
								margin="dense"
								id="familyName"
								label="Family Name"
								type="text"
								placeholder="Smith"
								fullWidth
							/>
						</div>
					</Collapse>
					<Collapse in={optionShown === 'join'}>
						<div>
							<DialogContentText>
								Enter a family members email address to find a family.
							</DialogContentText>
							<TextField
								autoFocus
								onChange={handleFamilyEmail}
								margin="dense"
								id="familyMemberEmail"
								label="Email Address"
								type="text"
								placeholder="JustinSmith@gmail.com"
								fullWidth
							/>
						</div>
					</Collapse>
				</DialogContent>
				<DialogActions>
					{optionShown && (
						<Button onClick={handleCancelAction} color="secondary">
							Cancel
						</Button>
					)}
					{optionShown && (
						<Button onClick={handleSubmit} color="primary" disabled={!!error}>
							{optionShown === 'create' ? 'Create' : 'Join'}
						</Button>
					)}
				</DialogActions>
			</Dialog>
			{error ? (
				<SnackbarError message={error} onClose={handleErrorClose} className={classes.margin} />
			) : null}
		</>
	)
}

JoinFamily.propTypes = {
	completeFamily: PropTypes.func.isRequired,
}

export default JoinFamily
