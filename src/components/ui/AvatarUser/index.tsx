import { Avatar, Typography } from '@mui/joy';

import { AvatarUserProps } from './AvatarUser';

const AvatarUser = (props: AvatarUserProps) => {
  const { name } = props;
  return (
    <>
      <Avatar size='sm'>
        <Typography level='body1' fontWeight='lg'>
          {name.slice(0, 2).toUpperCase()}
        </Typography>
      </Avatar>
      <Typography level='body1' fontWeight='lg'>
        {name}
      </Typography>
    </>
  );
};

export default AvatarUser;
