import { Avatar, Box, Typography } from '@mui/joy';

import { AvatarUserProps } from './AvatarUser';

const AvatarUser = (props: AvatarUserProps) => {
  const { name, date } = props;
  return (
    <>
      <Avatar size='sm'>
        <Typography level='body1' fontWeight='lg'>
          {name.slice(0, 2).toUpperCase()}
        </Typography>
      </Avatar>
      <Box display='flex' flexDirection='column'>
        <Typography level='body1' fontSize='16px' fontWeight='lg' height='20px'>
          {name}
        </Typography>
        <Typography level='body3' fontWeight='700' sx={{ color: 'text.secondary' }}>
          {date}
        </Typography>
      </Box>
    </>
  );
};

export default AvatarUser;
