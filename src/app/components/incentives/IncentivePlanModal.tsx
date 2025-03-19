"use client"

import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

interface IncentiveRule {
  id?: string;
  type: 'commission' | 'bonus' | 'points' | 'recognition';
  condition?: {
    metric: 'order_count' | 'order_value' | 'delivery_time' | 'customer_rating';
    operator: '>' | '>=' | '=' | '<' | '<=';
    value: number;
  };
  reward: {
    type: 'percentage' | 'fixed' | 'points';
    value: number;
    description: string;
  };
}

interface IncentivePlan {
  id?: string;
  name: string;
  description: string;
  type: 'basic' | 'tiered' | 'performance' | 'mixed';
  status: 'active' | 'inactive' | 'scheduled';
  startDate: string;
  endDate?: string;
  eligibleStores: 'all' | string[];
  rules: IncentiveRule[];
  createdAt?: string;
  updatedAt?: string;
}

interface IncentivePlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (plan: IncentivePlan) => void;
  plan: IncentivePlan | null;
}

export default function IncentivePlanModal({ isOpen, onClose, onSave, plan }: IncentivePlanModalProps) {
  const { language } = useLanguage();
  const [formData, setFormData] = useState<IncentivePlan>({
    name: '',
    description: '',
    type: 'basic',
    status: 'active',
    startDate: new Date().toISOString().split('T')[0],
    eligibleStores: 'all',
    rules: [
      {
        type: 'commission',
        reward: {
          type: 'percentage',
          value: 5,
          description: language === 'zh' ? '订单金额的5%佣金' : '5% commission on order value'
        }
      }
    ]
  });

  useEffect(() => {
    if (plan) {
      setFormData(plan);
    }
  }, [plan]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRuleTypeChange = (index: number, e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    const updatedRules = [...formData.rules];
    updatedRules[index] = {
      ...updatedRules[index],
      type: value as 'commission' | 'bonus' | 'points' | 'recognition'
    };
    setFormData(prev => ({
      ...prev,
      rules: updatedRules
    }));
  };

  const handleRewardTypeChange = (index: number, e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    const updatedRules = [...formData.rules];
    updatedRules[index] = {
      ...updatedRules[index],
      reward: {
        ...updatedRules[index].reward,
        type: value as 'percentage' | 'fixed' | 'points'
      }
    };
    setFormData(prev => ({
      ...prev,
      rules: updatedRules
    }));
  };

  const handleRewardValueChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    const updatedRules = [...formData.rules];
    updatedRules[index] = {
      ...updatedRules[index],
      reward: {
        ...updatedRules[index].reward,
        value: isNaN(value) ? 0 : value
      }
    };
    setFormData(prev => ({
      ...prev,
      rules: updatedRules
    }));
  };

  const handleRewardDescriptionChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const updatedRules = [...formData.rules];
    updatedRules[index] = {
      ...updatedRules[index],
      reward: {
        ...updatedRules[index].reward,
        description: value
      }
    };
    setFormData(prev => ({
      ...prev,
      rules: updatedRules
    }));
  };

  const handleEligibleStoresChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setFormData(prev => ({
      ...prev,
      eligibleStores: value === 'all' ? 'all' : []
    }));
  };

  // 添加规则
  const addRule = () => {
    setFormData(prev => ({
      ...prev,
      rules: [
        ...prev.rules,
        {
          type: 'commission',
          reward: {
            type: 'percentage',
            value: 5,
            description: language === 'zh' ? '订单金额的5%佣金' : '5% commission on order value'
          }
        }
      ]
    }));
  };

  // 删除规则
  const removeRule = (index: number) => {
    if (formData.rules.length <= 1) return;
    
    const updatedRules = [...formData.rules];
    updatedRules.splice(index, 1);
    
    setFormData(prev => ({
      ...prev,
      rules: updatedRules
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      createdAt: formData.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-[#6B4423] dark:text-[#C3A080] mb-6">
            {plan ? (language === 'zh' ? '编辑激励计划' : 'Edit Incentive Plan') : 
                    (language === 'zh' ? '创建激励计划' : 'Create Incentive Plan')}
          </h2>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {language === 'zh' ? '计划名称' : 'Plan Name'}
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#6B4423] focus:border-[#6B4423]"
                required
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {language === 'zh' ? '计划描述' : 'Plan Description'}
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#6B4423] focus:border-[#6B4423]"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {language === 'zh' ? '计划类型' : 'Plan Type'}
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#6B4423] focus:border-[#6B4423]"
                >
                  <option value="basic">{language === 'zh' ? '基础佣金' : 'Basic Commission'}</option>
                  <option value="tiered">{language === 'zh' ? '阶梯佣金' : 'Tiered Commission'}</option>
                  <option value="performance">{language === 'zh' ? '绩效奖励' : 'Performance Bonus'}</option>
                  <option value="mixed">{language === 'zh' ? '混合激励' : 'Mixed Incentive'}</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {language === 'zh' ? '状态' : 'Status'}
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#6B4423] focus:border-[#6B4423]"
                >
                  <option value="active">{language === 'zh' ? '活跃' : 'Active'}</option>
                  <option value="inactive">{language === 'zh' ? '非活跃' : 'Inactive'}</option>
                  <option value="scheduled">{language === 'zh' ? '已计划' : 'Scheduled'}</option>
                </select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {language === 'zh' ? '开始日期' : 'Start Date'}
                </label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#6B4423] focus:border-[#6B4423]"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {language === 'zh' ? '结束日期' : 'End Date'}
                </label>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate || ''}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#6B4423] focus:border-[#6B4423]"
                />
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {language === 'zh' ? '适用门店' : 'Eligible Stores'}
              </label>
              <select
                name="eligibleStores"
                value={typeof formData.eligibleStores === 'string' ? formData.eligibleStores : 'specific'}
                onChange={handleEligibleStoresChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#6B4423] focus:border-[#6B4423]"
              >
                <option value="all">{language === 'zh' ? '所有门店' : 'All Stores'}</option>
                <option value="specific">{language === 'zh' ? '指定门店' : 'Specific Stores'}</option>
              </select>
            </div>
            
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-medium text-[#6B4423] dark:text-[#C3A080]">
                  {language === 'zh' ? '激励规则' : 'Incentive Rules'}
                </h3>
                <button
                  type="button"
                  onClick={addRule}
                  className="px-3 py-1 bg-[#6B4423] text-white rounded-md hover:bg-[#5A371D] text-sm"
                >
                  {language === 'zh' ? '添加规则' : 'Add Rule'}
                </button>
              </div>
              
              {formData.rules.map((rule, index) => (
                <div key={index} className="border border-gray-300 rounded-md p-4 mb-3">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">
                      {language === 'zh' ? `规则 ${index + 1}` : `Rule ${index + 1}`}
                    </h4>
                    {formData.rules.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeRule(index)}
                        className="text-red-600 hover:text-red-800 text-sm"
                      >
                        {language === 'zh' ? '删除' : 'Remove'}
                      </button>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        {language === 'zh' ? '激励类型' : 'Incentive Type'}
                      </label>
                      <select
                        value={rule.type}
                        onChange={(e) => handleRuleTypeChange(index, e)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#6B4423] focus:border-[#6B4423]"
                      >
                        <option value="commission">{language === 'zh' ? '佣金' : 'Commission'}</option>
                        <option value="bonus">{language === 'zh' ? '奖金' : 'Bonus'}</option>
                        <option value="points">{language === 'zh' ? '积分' : 'Points'}</option>
                        <option value="recognition">{language === 'zh' ? '荣誉表彰' : 'Recognition'}</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        {language === 'zh' ? '奖励类型' : 'Reward Type'}
                      </label>
                      <select
                        value={rule.reward.type}
                        onChange={(e) => handleRewardTypeChange(index, e)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#6B4423] focus:border-[#6B4423]"
                      >
                        <option value="percentage">{language === 'zh' ? '百分比' : 'Percentage'}</option>
                        <option value="fixed">{language === 'zh' ? '固定金额' : 'Fixed Amount'}</option>
                        <option value="points">{language === 'zh' ? '积分' : 'Points'}</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        {language === 'zh' ? '奖励值' : 'Reward Value'}
                      </label>
                      <input
                        type="number"
                        value={rule.reward.value}
                        onChange={(e) => handleRewardValueChange(index, e)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#6B4423] focus:border-[#6B4423]"
                        min="0"
                        step="0.01"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        {language === 'zh' ? '奖励描述' : 'Reward Description'}
                      </label>
                      <input
                        type="text"
                        value={rule.reward.description}
                        onChange={(e) => handleRewardDescriptionChange(index, e)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#6B4423] focus:border-[#6B4423]"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                {language === 'zh' ? '取消' : 'Cancel'}
              </button>
              <button
                type="submit"
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#6B4423] hover:bg-[#5A371D]"
              >
                {language === 'zh' ? '保存' : 'Save'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 