import React from 'react'
import {
	Dialog,
	DialogTitle,
	DialogContent,
	TextField,
	Button,
	DialogActions,
	IconButton,
} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import ProfileImage from 'components/ProfileImage'
import {AddAPhoto} from '@material-ui/icons'
import {blue} from '@material-ui/core/colors'
import {uploadImage, updateKid, getKid} from 'lib/store'

const useStyles = makeStyles(theme => ({
	profileImageWrapper: {
		height: 128,
		width: 128,
		margin: '0 auto',
		position: 'relative',
	},
	profileImage: {
		height: 128,
		width: 128,
	},
	photoEdit: {
		position: 'absolute',
		right: 0,
		bottom: 0,
		borderWidth: 3,
		borderColor: 'white',
		borderStyle: 'solid',
		backgroundColor: blue[500],
		color: 'white',
		'&:hover': {
			backgroundColor: blue[500],
		},
		'&:active': {
			backgroundColor: blue[500],
		},
	},
	photoInput: {
		display: 'none',
	},
}))

function EditImage({onChange}) {
	const classes = useStyles()

	return (
		<>
			<input accept="image/jpg" className={classes.photoInput} onChange={onChange} id="icon-button-file" type="file" />
			<label htmlFor="icon-button-file">
				<IconButton className={classes.photoEdit} aria-label="Upload Photo" component='span'>
					<AddAPhoto />
				</IconButton>
			</label>
		</>
	)
}

function EditKid({open, kidId, onClose}) {
	const classes = useStyles()
	const [values, setValues] = React.useState({
		name: '',
		image: '',
		points: 0
	})
	const [error, setError] = React.useState(null)

	React.useEffect(() => {
		const getKidInfo = async () => {
			const kidInfo = await getKid(kidId)
			setValues({name: kidInfo.name, image: kidInfo.image, points: kidInfo.points})
		}
		getKidInfo()
	}, [kidId])

	const handleNameChange = event => {
		setError(event.target.value.length === 0)
		setValues({...values, name: event.target.value})
	}

	const handleUploadImage = async event => {
		if (event.target.files && event.target.files.length === 1) {
			const newURI = await uploadImage(event.target.files[0])
			setValues({...values, image: newURI})
		}
	}

	const saveChanges = async () => {
		await updateKid({
			kidId,
			name: values.name,
			image: values.image,
			points: values.points
		})
		onClose(true)
	}

	return (
		<Dialog open={open} fullWidth maxWidth="xl" aria-labelledby="form-dialog-title">
			<DialogTitle id="form-dialog-title">Edit Kid</DialogTitle>
			<DialogContent>
				<div className={classes.profileImageWrapper}>
					<ProfileImage name={values.name} image={values.image} className={classes.profileImage} />
					<EditImage onChange={handleUploadImage} />
				</div>
				<TextField
					id="kid-name"
					label="Name"
					value={values.name}
					placeholder="Jimmy"
					margin="normal"
					error={error}
					onChange={handleNameChange}
					required
					fullWidth
				/>
			</DialogContent>
			<DialogActions>
				<Button color="secondary" onClick={onClose}>
					Cancel
				</Button>
				<Button color="primary" onClick={saveChanges}>
					Save
				</Button>
			</DialogActions>
		</Dialog>
	)
}

export default EditKid
