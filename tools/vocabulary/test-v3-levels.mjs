import fs from 'node:fs';
import assert from 'node:assert/strict';
import {auditV3} from '../../js/lesson-v3.js';
import {verifyV3} from './verify-v3.mjs';

const data=JSON.parse(fs.readFileSync(new URL('../../data/vocabulary/hanzii-course.json',import.meta.url),'utf8'));
const easy=structuredClone(data.words.find(word=>word.lesson?.version===3&&word.lesson.difficulty==='easy'));
const hard=structuredClone(data.words.find(word=>word.lesson?.version===3&&word.lesson.difficulty==='hard'));
assert(easy&&hard,'Need real easy and hard V3 representatives');

const medium=structuredClone(easy);
medium.id='fixture-v3-medium';
medium.lesson.difficulty='medium';
medium.lesson.difficultyReason='Fixture: cấu trúc và vị trí cần hai bài ghép câu để kiểm tra mức trung bình.';
medium.lesson.guidedExercises.push({...structuredClone(medium.lesson.guidedExercises[0]),id:'g2',prompt:'Fixture thứ hai cho mức trung bình.'});

for(const word of [easy,medium,hard]){assert(auditV3(word).ready,`${word.lesson.difficulty} representative must pass`);verifyV3(word);}
for(const word of [easy,medium,hard]){const invalid=structuredClone(word);invalid.lesson.guidedExercises.length={easy:0,medium:1,hard:2}[word.lesson.difficulty];assert(!auditV3(invalid).ready,`${word.lesson.difficulty} minimum must be enforced`);}

console.log('PASS V3 levels: easy real word 我, medium fixture and hard real word 下; flexible cardinalities and per-level minima verified.');
