import Button from "components/Button";
import Input, { InputDropdown, Select } from "components/Input";
import Modal from "components/Modal";
import { dispatchStore } from "helpers/utils";
import useFetch from "hooks/useFetch";
import useToggle from "hooks/useToggle";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { getBanks, submitBank, updateBank } from "services/payment";
import { edit_community } from "store/actions/community";

const SetupBankModal = ({ show, toggleClose, creationCondition }: any) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();


  const stateCommunity = useSelector((state:any) => state.community)

  const [ banks, loadingBanks, bankError ] = useFetch(getBanks)
  const [ filterText, setFilterText] = useState('')

  const [filteredBanks, setFilteredBanks] = useState(banks || [])
  const [showDropdown, toggleShowDropdown] = useToggle(false);
  const [ selectedBank, setSelectedBank ] = useState('')

  useEffect(()=>{
    setFilteredBanks(banks)
  }, [banks])

  useEffect(()=> {
    console.log(filterText)
    if((banks !== undefined)){
      toggleShowDropdown(true)
      const filtered  = banks.filter((el:any) => ((el.name).toLowerCase()).includes(filterText.toLowerCase()))
      setFilteredBanks(filtered)
    }
  },[filterText])


  const select =(value:string)=>{
    setSelectedBank(value)
    toggleShowDropdown(false)
  }

  const onSubmit = (data: any) => {
    console.log(data);
    data.bank_name = selectedBank

    if(stateCommunity.account_name){
      data.bank_verification_number = stateCommunity.bank_verification_number
      updateBank(data).then(
        (res:any) => {
          console.log(res.data.results)
          creationCondition("edited");
          dispatchStore(edit_community(res.data.results))
        }
        ).catch(err => {
          console.log(err)
        })
        
      }else{
        submitBank(data).then(
          (res:any) => {
            creationCondition("successful");
            dispatchStore(edit_community(res.data.results))
          console.log(res.data.results)
        }
        ).catch(err => {
          creationCondition("failed");
          console.log('failed')
        })
    }

    

      toggleClose();
  };

  return (
    <Modal show={show} toggleClose={toggleClose}>
      <div className="p-8 mb-4 relative">
        <h4>Set up your bank account</h4>
        <hr className="my-6 absolute w-full left-0" />

        <form className="mt-16" onSubmit={handleSubmit(onSubmit)}>
          <InputDropdown
            name="bank"
            label="Bank*"
            value={ stateCommunity.bank_name || '' }
            error={errors.bank && "Please enter a bank"}
            placeholder="Please enter your bank name"
            register={register}
            options={{ required: true, minLenght: 1 }} 
            list={filteredBanks}
            select={select}
            showDropdown={showDropdown} 
            onChange={(e:any)=>{
              setFilterText(e)
            }}    
            onFocus={()=>{
              toggleShowDropdown(true)
            }}   
            onBlur={()=>{
              toggleShowDropdown(false)
            }}  
            />

          <Input
            name="account_name"
            placeholder="Please enter your account name"
            label="Account Name*"
            value={stateCommunity.account_name || ''}
            register={register}
            error={errors.account_name && "Please enter an account name"}
            options={{ required: true, minLenght: 1 }}
          />

          <Input
            name="account_number"
            placeholder="Please enter your account number"
            label="Account Number*"
            register={register}
            value={stateCommunity.bank_account_number}
            type="number"
            error={
              errors.account_number && "Please enter a correct account number"
            }
            options={{ required: true, minLength: 10, maxLength: 10 }}
          />

          {/* <Input
            name="bank_verification_number"
            placeholder={ stateCommunity.bank_verification_number ? "***" : "Please enter your BVN"}
            label="Bank Verification Number (BVN)*"
            register={register}
            type="number"
            disabled={stateCommunity.bank_verification_number ? true : false}
            error={
              errors.bank_verification_number && "Please enter a correct BVN"
            }
            options={ !stateCommunity.bank_verification_number ? { required: true, minLenght: 3, maxLenght: 3 } : {}}
          /> */}

          <div className="w-80 float-right pb-8 gap-4 flex">
            <Button type="submit" title="Save" />
            <Button onClick={toggleClose} title="Cancel" other />
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default SetupBankModal;
