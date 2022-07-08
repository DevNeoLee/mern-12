
import { Form, FormLabel } from 'react-bootstrap';
import { useState, useEffect } from 'react';

export default function Radio({ value, label, name, inline, required, handleChange }) {

    const [choice, setChoice] = useState(null)

  return (
            <Form.Check
                inline={inline}
                label={label}
                name={name}
                value={value}
                onChange={handleChange}
                type="radio"
                id={label}
                required= "required"
            />
        )
  }
       
          