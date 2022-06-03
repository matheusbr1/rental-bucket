import React from 'react'
import { FormStatus, IAddress, IContact, ICustomer, PersonType } from 'interfaces'
import { Field, useFormikContext } from 'formik'
import FormikTextField from 'components/FormikTextField'
import { RadioGroup } from 'formik-mui'
import { FormControlLabel, Radio } from '@mui/material'
import { Divider, Grid } from '@material-ui/core'
import { Contacts } from 'components/Contacts'
import { Adresses } from 'components/Adresses'

interface ICustomerCoreFormProps {
  formStatus?: FormStatus
}

const CustomerCoreForm: React.FC<ICustomerCoreFormProps> = ({ formStatus = 'isFilling'  }) => {
  const { setFieldValue, values, isSubmitting } = useFormikContext<ICustomer>()

  const renderFieldsByPerson = (person: PersonType, isSubmitting: boolean) => {
    const disabled = formStatus === 'isViewing' || isSubmitting

    if (person === 'F') {
      return (
      <React.Fragment>
        <Grid item lg={6} md={6} sm={6} xs={12} >
          <Field 
            component={FormikTextField} 
            label='Nome' 
            name='name'
            disabled={disabled}
          />
        </Grid>

        <Grid item lg={6} md={6} sm={6} xs={12} >
          <Field 
            component={FormikTextField} 
            label='CPF' 
            name='CPF_CNPJ' 
            disabled={disabled}
          />
        </Grid>
      </React.Fragment>
      )
    }

    if (person === 'J') {
      return (
        <React.Fragment>
          <Grid item lg={6} md={6} sm={6} xs={12} >
            <Field 
              component={FormikTextField} 
              label='Razão Social' 
              name='company_name' 
              disabled={disabled}
            />
          </Grid>

          <Grid item lg={6} md={6} sm={6} xs={12} >
            <Field 
              component={FormikTextField} 
              label='Nome Fantasia' 
              name='fantasy_name' 
              disabled={disabled}
            />
          </Grid>

          <Grid item lg={6} md={6} sm={6} xs={12} >
            <Field 
              component={FormikTextField} 
              label='CNPJ' 
              name='CPF_CNPJ' 
              disabled={disabled}
            />
          </Grid>

          <Grid item lg={6} md={6} sm={6} xs={12} />
        </React.Fragment>
      )
    }
  }

  return (
    <>
      <Grid item lg={12} md={12} sm={12} xs={12} >
        <Field
          row
          component={RadioGroup}
          name='person_type'
        >
          <FormControlLabel
            value="F"
            defaultChecked
            label="Pessoa Física"
            disabled={formStatus === 'isViewing' || isSubmitting}
            control={<Radio />}
          />

          <FormControlLabel
            value="J"
            label="Pessoa Jurídica"
            disabled={formStatus === 'isViewing' || isSubmitting}
            control={<Radio />}
          />
        </Field>
      </Grid>

      {renderFieldsByPerson(values.person_type, isSubmitting)}

      <Grid item lg={12} md={12} sm={12} xs={12} >
        <Divider style={{ margin: '2rem 0' }} />
      </Grid>

      <Grid item lg={12} md={12} sm={12} xs={12} >
        <Adresses
          disabled={formStatus === 'isViewing'}
          adresses={values.adresses} 
          setAdresses={(adresses: IAddress[]) => setFieldValue('adresses', adresses)} 
        />
      </Grid>

      <Grid item lg={12} md={12} sm={12} xs={12} >
        <Divider style={{ margin: '2rem 0' }} />
      </Grid>
      
      <Grid item lg={12} md={12} sm={12} xs={12} >
        <Contacts
          disabled={formStatus === 'isViewing'}
          contacts={values.contacts} 
          setContacts={(contacts: IContact[]) => setFieldValue('contacts', contacts)} 
        />
      </Grid>

      <Grid item lg={12} md={12} sm={12} xs={12} >
        <Divider style={{ margin: '2rem 0' }} />
      </Grid>
    </>
  )
}

export { CustomerCoreForm }