import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

Number.prototype.padLeft = function (base, chr) {
  var len = String(base || 10).length - String(this).length + 1;

  return len > 0 ? new Array(len).join(chr || '0') + this : this;
};

const Poll = ({ question }) => {
  const navigate = useNavigate();

  const d = new Date(question.timestamp);
  const formatedTime = `${(d.getHours() % 12 || 12).toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}:${(d.getHours() >= 12) ? 'PM' : 'AM'} | 
      ${(d.getDate()).toString().padStart(2, '0')}/${(d.getMonth() + 1).toString().padStart(2, '0')}/${d.getFullYear()}`;

    
  const handleShowPollDetail = (e) => {
    e.preventDefault();
    navigate(`/questions/${question.id}`)
  };

  return (
    <Paper elevation={5} >
      <Box sx={{ minWidth: 275 }}>
        <Card variant="outlined">
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h5" sx={{ mb: 1 }}>
              {question.author}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {formatedTime}
            </Typography>
          </CardContent>
          <CardActions
            sx={{
              justifyContent: 'center',
              borderTop: '1px solid rgba(0, 0, 0, 0.3)',
              px: 4,
              py: 2,
            }}
          >
            <Button onClick={handleShowPollDetail} size="large" variant="outlined" color="success">
              Show
            </Button>
          </CardActions>
        </Card>
      </Box>
    </Paper>
  );
};

Poll.propTypes = {
  question: PropTypes.object.isRequired,
};

export default Poll;
