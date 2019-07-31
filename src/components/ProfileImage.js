import React from 'react'
import Avatar from '@material-ui/core/Avatar'

function ProfileImage({image, name, ...other}) {
	if (image) {
		return <Avatar alt={name} src={image} />
	} else {
		return <Avatar {...other}>{name.substring(0, 1)}</Avatar>
	}
}

export default ProfileImage
