import * as React from 'react';
import ReactMarkdown from 'markdown-to-jsx';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

const options = {
  overrides: {
    h1: {
      component: Typography,
      props: {
        gutterBottom: true,
        variant: 'h4',
        align: 'left',
      },
    },
    h2: {
      component: Typography,
      props: { 
        gutterBottom: true, 
        variant: 'h6',
        align: 'left',    
      },
    },
    h3: {
      component: Typography,
      props: { 
        gutterBottom: true, 
        variant: 'subtitle1',
        align: 'left',     
      },
    },
    h4: {
      component: Typography,
      props: {
        gutterBottom: true,
        variant: 'caption',
        paragraph: true,
        align: 'left',    
      },
    },
    p: {
      component: Typography,
      props: { 
        paragraph: true,
        align: 'left',    
      },
    },
    a: { component: Link },
    li: {
      component: (props) => (
        <Box component="li" sx={{ mt: 1 }}>
          <Typography component="span" {...props} />
        </Box>
      ),
    },
  },
};

export default function Markdown(props) {
  return <ReactMarkdown options={options} {...props} />;
}
