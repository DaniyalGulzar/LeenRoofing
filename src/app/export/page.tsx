import AuthWrapper from "@/components/AuthWrapper";
import Button from "@/components/Button";
import InputField from "@/components/InputField";
import Image from "next/image";

const Export = () => {
  const options = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
  ];

  return (
    <div className="h-[100vh] overflow-auto bg-gray-100">
      <AuthWrapper title="Welcome Back, Tony">
        <div className="w-full px-[20px] md:px-[48px] pt-[15px] md:pt-[35px]">
          <div className="flex flex-col md:flex-row justify-between mb-[19px] items-center">
            <div className="w-full sm:w-auto sm:mr-auto mb-4 sm:mb-0">
              <span className="text-[#2C3D33] text-[20px]">
                {" "}
                Export estimates
              </span>
            </div>
          </div>
          <hr className="border-b border-gray-200 mb-[34px]" />
          <div className="border rounded-lg  bg-white">
            <div className="flex flex-col md:flex-row justify-between  px-[31px] py-[23px] items-center">
              <span className="text-[20px] text-[#2C3D33] ">
                Select estimate to export
              </span>
            </div>

            {/* Divider */}
            <hr className="mb-2" />

            {/* Input Fields */}
            <div className="grid grid-cols-1 px-[27px] pt-[24px] pb-[40px] ">
              <InputField
                type="select"
                required={true}
                name="diane"
                placeholder="Diane Chauner"
                options={options}
                className="h-[56px] cursor-pointer"
              />
            </div>
          </div>
          <div className="mt-[20px] mb-[45px] bg-white  border rounded md:h-[357px] ">
            <div className="flex flex-col md:flex-row justify-between items-center px-[31px] py-[23px] ">
              <span className="text-[20px] text-[#2C3D33] ">
                Estimate available to export
              </span>
            </div>
            <hr className="border-gray-300 mb-[27px]" />

            {["Measurements", "Other Details", "Gutter Calculations"].map(
              (item, index) => (
                <div
                  key={index}
                  className="flex flex-col sm:flex-row sm:justify-between items-center cursor-pointer mx-auto sm:mx-6 px-6 sm:px-8 sm:h-[64px] h-auto bg-[#FAFAFA] mb-4 text-center sm:text-left"
                >
                  <div className="flex flex-col items-center sm:items-start">
                    <span className="text-base sm:text-lg text-[#2C3D33]">
                      {item}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2 mt-2 sm:mt-0 justify-center">
                    {["csv"].map((icon, i) => (
                      <Image
                        key={i}
                        src={`/svgs/${icon}.svg`}
                        width={21}
                        height={21}
                        alt={icon}
                      />
                    ))}
                  </div>
                </div>
              )
            )}
          </div>

          <div className="flex justify-end items-center my-[21px]">
            <Button className="font-semibold text-[10px] p-4 bg-[#F2BE22] w-[122px] h-[37px] rounded-3xl cursor-pointer">
              BULK EXPORT
            </Button>
          </div>
        </div>
      </AuthWrapper>
    </div>
  );
};

export default Export;
