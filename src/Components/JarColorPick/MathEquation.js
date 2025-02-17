import React from 'react';

import { InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';

const MathEquation = ({ equation }) => {
    return <InlineMath math={equation} />;
};

export default MathEquation;