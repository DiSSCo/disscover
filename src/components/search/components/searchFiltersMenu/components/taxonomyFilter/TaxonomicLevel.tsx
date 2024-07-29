/* Import Dependencies */
import classNames from "classnames";
import { FieldArray } from "formik";
import { isEmpty } from "lodash";
import { Row, Col } from 'react-bootstrap';

/* Import Utilties */
import { NextTaxonomyLevel } from "app/utilities/TaxonomicUtilities";

/* Import Types */
import { Dict } from "app/Types";


/* Props Type */
type Props = {
    taxonomicLevel: string,
    taxonomicTreeSegment: Dict,
    fieldValues: { [taxonomicLevel: string]: string[] }
    OnSelect?: Function,
    RenderTaxonomicLevels: Function
};


const TaxonomicLevel = (props: Props) => {
    const { taxonomicLevel, taxonomicTreeSegment, fieldValues, OnSelect, RenderTaxonomicLevels } = props;

    return (
        <FieldArray name={`filters.taxonomy.${taxonomicLevel}`}>
            {({ push, remove }) => (
                <>
                    {Object.entries(taxonomicTreeSegment).map(([key, object]) => {
                        const fieldValuesIndex: number = fieldValues[taxonomicLevel].findIndex(fieldValue => fieldValue === key);

                        /* Class Names */
                        const taxonomicLevelValueClass = classNames({
                            'tc-primary fw-bold': fieldValuesIndex >= 0,
                            'mc-default': key.includes('Unknown')
                        });

                        return (
                            <Row key={key}>
                                <Col>
                                    <button type="button"
                                        className={`${taxonomicLevelValueClass} button-no-style fs-5`}
                                        onClick={() => {
                                            /* Check if key is not part of unknown values */
                                            if (!key.includes('Unknown')) {
                                                /* Check if index is present in field values, if not push to array, otherwise remove */
                                                if (fieldValuesIndex >= 0) {
                                                    remove(fieldValuesIndex);
                                                } else {
                                                    push(key);
                                                };

                                                OnSelect?.();
                                            }
                                        }}
                                    >
                                        <p>{key}</p>
                                    </button>

                                    {!isEmpty(object) &&
                                        <div className="ms-1 ps-1 bl-primary">
                                            {RenderTaxonomicLevels(object, NextTaxonomyLevel(taxonomicLevel))}
                                        </div>
                                    }
                                </Col>
                            </Row>
                        );
                    })}
                </>
            )}
        </FieldArray>
    );
};

export default TaxonomicLevel;