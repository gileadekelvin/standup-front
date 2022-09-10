import { Avatar, Typography } from '@mui/joy';

import { AvatarUserProps } from './AvatarUser';

const AvatarUser = (props: AvatarUserProps) => {
  const { name } = props;
  return (
    <>
      <Avatar size='sm'>
        <Typography fontSize='sm' fontWeight='lg'>
          {name.slice(0, 2).toUpperCase()}
        </Typography>
      </Avatar>
      <Typography fontSize='sm' fontWeight='lg'>
        {name}
      </Typography>
    </>
  );
};

export default AvatarUser;
