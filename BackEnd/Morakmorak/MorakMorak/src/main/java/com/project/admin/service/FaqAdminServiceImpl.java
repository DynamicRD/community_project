package com.project.admin.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.project.admin.mapper.FaqAdminMapper;
import com.project.admin.model.FaqAdmin;

import lombok.RequiredArgsConstructor;
@Service
@RequiredArgsConstructor
public class FaqAdminServiceImpl implements FaqAdminService {
    private final FaqAdminMapper faqMapper;

    @Override
    public List<FaqAdmin> getFaqs() {
        return faqMapper.getFaqs();
    }

    @Override
    public void addFaq(FaqAdmin faq) {
        faqMapper.addFaq(faq);
    }

    @Override
    public void updateFaq(FaqAdmin faq) {
        faqMapper.updateFaq(faq);
    }

    @Override
    public void deleteFaq(Long id) {
        faqMapper.deleteFaq(id);
    }
}
